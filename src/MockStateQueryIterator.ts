import { Iterators, KV, NextResult } from 'fabric-shim';

/**
 * @hidden
 */
export class MockStateQueryIterator implements Iterators.StateQueryIterator {

    private currentLoc = 0;
    private closed = false;

    constructor(private data: KV[]) {
    }

    next(): Promise<NextResult> {

        if (this.closed) {
            throw new Error('Iterator has already been closed');
        }

        this.currentLoc++;

        return Promise.resolve({
            value: this.data[this.currentLoc - 1],
            done: this.data.length <= this.currentLoc
        });
    }

    close(): void {
        this.closed = true;
    }

}