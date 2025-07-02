/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export type Direction = 'left' | 'right' | 'up' | 'down' | 'wordLeft' | 'wordRight' | 'home' | 'end';
type UpdateOperation = {
    type: 'insert';
    payload: string;
} | {
    type: 'backspace';
};
export interface Viewport {
    height: number;
    width: number;
}
interface UseTextBufferProps {
    initialText?: string;
    initialCursorOffset?: number;
    viewport: Viewport;
    stdin?: NodeJS.ReadStream | null;
    setRawMode?: (mode: boolean) => void;
    onChange?: (text: string) => void;
    isValidPath: (path: string) => boolean;
}
export declare function offsetToLogicalPos(text: string, offset: number): [number, number];
export declare function useTextBuffer({ initialText, initialCursorOffset, viewport, stdin, setRawMode, onChange, isValidPath, }: UseTextBufferProps): TextBuffer;
export interface TextBuffer {
    lines: string[];
    text: string;
    cursor: [number, number];
    /**
     * When the user moves the caret vertically we try to keep their original
     * horizontal column even when passing through shorter lines.  We remember
     * that *preferred* column in this field while the user is still travelling
     * vertically.  Any explicit horizontal movement resets the preference.
     */
    preferredCol: number | null;
    selectionAnchor: [number, number] | null;
    allVisualLines: string[];
    viewportVisualLines: string[];
    visualCursor: [number, number];
    visualScrollRow: number;
    /**
     * Replaces the entire buffer content with the provided text.
     * The operation is undoable.
     */
    setText: (text: string) => void;
    /**
     * Insert a single character or string without newlines.
     */
    insert: (ch: string) => void;
    newline: () => void;
    backspace: () => void;
    del: () => void;
    move: (dir: Direction) => void;
    undo: () => boolean;
    redo: () => boolean;
    /**
     * Replaces the text within the specified range with new text.
     * Handles both single-line and multi-line ranges.
     *
     * @param startRow The starting row index (inclusive).
     * @param startCol The starting column index (inclusive, code-point based).
     * @param endRow The ending row index (inclusive).
     * @param endCol The ending column index (exclusive, code-point based).
     * @param text The new text to insert.
     * @returns True if the buffer was modified, false otherwise.
     */
    replaceRange: (startRow: number, startCol: number, endRow: number, endCol: number, text: string) => boolean;
    /**
     * Delete the word to the *left* of the caret, mirroring common
     * Ctrl/Alt+Backspace behaviour in editors & terminals. Both the adjacent
     * whitespace *and* the word characters immediately preceding the caret are
     * removed.  If the caret is already at column‑0 this becomes a no-op.
     */
    deleteWordLeft: () => void;
    /**
     * Delete the word to the *right* of the caret, akin to many editors'
     * Ctrl/Alt+Delete shortcut.  Removes any whitespace/punctuation that
     * follows the caret and the next contiguous run of word characters.
     */
    deleteWordRight: () => void;
    /**
     * Deletes text from the cursor to the end of the current line.
     */
    killLineRight: () => void;
    /**
     * Deletes text from the start of the current line to the cursor.
     */
    killLineLeft: () => void;
    /**
     * High level "handleInput" – receives what Ink gives us.
     */
    handleInput: (key: {
        name: string;
        ctrl: boolean;
        meta: boolean;
        shift: boolean;
        paste: boolean;
        sequence: string;
    }) => boolean;
    /**
     * Opens the current buffer contents in the user's preferred terminal text
     * editor ($VISUAL or $EDITOR, falling back to "vi").  The method blocks
     * until the editor exits, then reloads the file and replaces the in‑memory
     * buffer with whatever the user saved.
     *
     * The operation is treated as a single undoable edit – we snapshot the
     * previous state *once* before launching the editor so one `undo()` will
     * revert the entire change set.
     *
     * Note: We purposefully rely on the *synchronous* spawn API so that the
     * calling process genuinely waits for the editor to close before
     * continuing.  This mirrors Git's behaviour and simplifies downstream
     * control‑flow (callers can simply `await` the Promise).
     */
    openInExternalEditor: (opts?: {
        editor?: string;
    }) => Promise<void>;
    copy: () => string | null;
    paste: () => boolean;
    startSelection: () => void;
    replaceRangeByOffset: (startOffset: number, endOffset: number, replacementText: string) => boolean;
    moveToOffset(offset: number): void;
    applyOperations: (ops: UpdateOperation[]) => void;
}
export {};
