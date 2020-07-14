| Component | Offset | End | Length | Type | Description | 
|--------------|-----------|--------|-----------|---------|----------------| 
| Checksum | 0x00 | 0x01 | 0x2 | short | overall file checksum | 
| File Magic | 0x02 | 0x0D | 0xC | string | NUL-terminated constant string: 4143 524f 5353 2644 4f57 4e00 ("ACROSS&DOWN") |
| CIB Checksum | 0x0E | 0x0F | 0x2 | short | (defined later) | 
| Masked Low Checksums | 0x10 | 0x13 | 0x4 | | A set of checksums, XOR-masked against a magic string. | 
| Masked High Checksums | 0x14 | 0x17 | 0x4 | | A set of checksums, XOR-masked against a magic string. |
| Version String(?) | 0x18 | 0x1B | 0x4 | string | e.g. "1.2\0" | 
| Reserved1C(?) | 0x1C | 0x1D | 0x2 | ? | In many files, this is uninitialized memory | 
| Scrambled Checksum | 0x1E | 0x1F | 0x2 | short | In scrambled puzzles, a checksum of the real solution (details below). Otherwise, 0x0000. | 
| Reserved20(?) | 0x20 | 0x2B | 0xC | ? | In files where Reserved1C is garbage, this is garbage too. | 
| Width | 0x2C | 0x2C | 0x1 | byte | The width of the board | 
| Height | 0x2D | 0x2D | 0x1 | byte | The height of the board | 
| # of Clues | 0x2E | 0x2F | 0x2 | short | The number of clues for this board | 
| Unknown Bitmask | 0x30 | 0x31 | 0x2 | short | A bitmask. Operations unknown. | 
| Scrambled Tag | 0x32 | 0x33 | 0x2 | short | 0 for unscrambled puzzles. Nonzero (often 4) for scrambled puzzles. |
