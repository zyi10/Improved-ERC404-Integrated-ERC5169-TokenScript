//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {ERC404} from "./ERC404/ERC404.sol";
import {ERC5169} from "stl-contracts/ERC/ERC5169.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

contract TokenScript404 is Ownable, ERC404, ERC5169 {
    using Strings for uint256;
    uint8 constant _decimals = 18;
    uint256 mintSupply = 10000;
    string constant _JSON_FILE = ".json";

    event BaseUriUpdate(string uri);

    string private constant __NAME = "TokenScript404";
    string private constant __SYM = "TS404";

    string public baseURI;

    constructor(
        address initialOwner_,
        address initialMintRecipient_
    ) ERC404(__NAME, __SYM, _decimals) Ownable(initialOwner_) {
        // Do not mint the ERC721s to the initial owner, as it's a waste of gas.
        _setERC721TransferExempt(initialMintRecipient_, true);
        _mintERC20(initialMintRecipient_, mintSupply * units, false);
        baseURI = "https://path-to-ftp/";
    }

    function contractURI() public pure returns (string memory) {
        return ""; // link to your contract metadata
    }

    function tokenURI(uint256 id) public override view returns (string memory) {
        uint8 seed = uint8(bytes1(keccak256(abi.encodePacked(id))));
        string memory image;
        string memory color;

        if (seed <= 100) {
            image = "1.gif";
            color = "Green";
        } else if (seed <= 160) {
            image = "2.gif";
            color = "Blue";
        } else if (seed <= 210) {
            image = "3.gif";
            color = "Purple";
        } else if (seed <= 240) {
            image = "4.gif";
            color = "Orange";
        } else if (seed <= 255) {
            image = "5.gif";
            color = "Red";
        }

        return
            string(
                abi.encodePacked(
                    '{"name": "404Tokens #',
                    Strings.toString(id),
                    '","description":"A collection of ',
                    Strings.toString(mintSupply),
                    ' ERC-404 Tokens enhanced with ERC-5169 TokenScript',
                    '","external_url":"https://yourproject.net","image":"',
                    baseURI, image,
                    '","attributes":[{"trait_type":"Color","value":"',
                    color,
                    '"}]}'
                )
            );
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
