# URL State Management for Nonogram Game

## How It Works

The board state is now automatically saved in the URL using query parameters. This means:

### ✅ **Persistent Game State**

- Your progress is saved automatically as you play
- Refreshing the page restores your exact position
- You can bookmark your game at any point
- Share your progress with others via URL

### 🔗 **URL Structure**

```
/game/1728123456789?board=000110000-100010001-001000100&history=000000000-000000000|000110000-100010001-001000100&move=1
```

**Parameters:**

- `board`: Current board state (encoded)
- `history`: All previous moves (pipe-separated)
- `move`: Current move number

### 🎯 **Encoding System**

Each cell state is encoded as:

- `0` = Default (empty)
- `1` = Confirmed (filled)
- `2` = Disabled (marked as empty)

Rows are separated by `-` and moves in history by `|`

### 🎮 **Features**

1. **Auto-save**: Every move updates the URL
2. **Undo/Redo**: History is preserved in URL
3. **Share Progress**: Copy URL to share exact game state
4. **Cross-session**: Resume exactly where you left off

### 🔄 **State Synchronization**

- Board changes → URL updates automatically
- URL changes → Board state restores
- History maintained for undo functionality
- Move counter tracked for navigation

## Testing

1. Start a new game
2. Make some moves (fill/mark squares)
3. Copy the URL (use "Share Progress" button)
4. Refresh the page → Same state loads
5. Paste URL in new tab → Exact same progress appears
6. Use undo → URL updates with history
