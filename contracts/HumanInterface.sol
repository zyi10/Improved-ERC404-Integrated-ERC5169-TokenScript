//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC404} from "./ERC404/ERC404.sol";
import {ERC5169} from "stl-contracts/ERC/ERC5169.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract HumanInterface is Ownable, ERC404, ERC5169 {
    using Strings for uint256;
    uint8 constant _decimals = 18;
    uint256 mintSupply = 10000;
    string constant _JSON_FILE = ".json";

    event BaseUriUpdate(string uri);

    string constant private __NAME = "Human Interface";
    string constant private __SYM  = "HI404";

    //Testnet only, remove for Production
    string public baseURI =
        "ipfs://QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/";

    constructor(
        address initialOwner_,
        address initialMintRecipient_
    ) ERC404(__NAME, __SYM, _decimals) Ownable(initialOwner_) {
        // Do not mint the ERC721s to the initial owner, as it's a waste of gas.
        _setERC721TransferExempt(initialMintRecipient_, true);
        _mintERC20(initialMintRecipient_, mintSupply * units, false);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        //return string(abi.encodePacked(baseURI, tokenId.toString(), _JSON_FILE)); // For deployment
        return string(abi.encodePacked(baseURI, tokenId.toString())); // For testnet demo only
    }

    function setBaseURI(string calldata newBaseURI) external onlyOwner {
        baseURI = newBaseURI;
        emit BaseUriUpdate(newBaseURI);
    }

    function setWhitelist(address account_, bool value_) external onlyOwner {
        _setERC721TransferExempt(account_, value_);
    }

    // Treat as ERC721 type, provide ERC20 interface in TokenScript
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC5169, ERC404) returns (bool) {
        return
            ERC5169.supportsInterface(interfaceId) ||
            ERC404.supportsInterface(interfaceId);
    }

    // ERC-5169
    function _authorizeSetScripts(
        string[] memory
    ) internal view override(ERC5169) onlyOwner {}
}
