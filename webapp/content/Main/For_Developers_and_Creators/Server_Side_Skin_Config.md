---
title: Server-Side Skin Config
---

Since **DTN 1.18.64**, server administrators can control which dog skins are allowed on their server using a datapack-based configuration system. This system allows for blacklisting or whitelisting specific skins based on their texture's SHA-1 hash.

## Setup
To configure the skin restrictions, you must create or modify a datapack:

1. In your datapack, create the following directory structure:
   `data/doggytalents/doggytalents/allowed_skin/`
2. Create a file named `allowed_skin.json` within that directory.

## Configuration Format
The `allowed_skin.json` file should follow this structure:

```json
{
  "strategy": "allow_except",
  "hash": [
    "hash_1",
    "hash_2",
    "hash_n"
  ]
}
```

### Fields:
- **`strategy`**: Defines how the hash list is interpreted:
  - `allow_except`: Allows all skins except those listed in the `hash` array (Blacklist).
  - `disallow_except`: Disallows all skins except those listed in the `hash` array (Whitelist).
- **`hash`**: An array of SHA-1 hash strings representing the dog skin textures.

## Obtaining Texture Hashes
To find the hash value for a specific skin:
1. Open the **Dog Menu** on a dog.
2. Navigate to the **Style** tab.
3. Go to the **Skins** section.
4. Use the **Show Info** feature to view the technical details of a skin, which includes its texture's SHA-1 hash.

## Notes
- This system is server-side. Clients attempting to use a restricted skin will have their skin reverted to the default "Pale" variant.
- Changes require a reload of the server's datapacks (`/reload` command).
