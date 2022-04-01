export type SessionNumber = number;
export type SessionDeckNumbers = number[];

export class SessionDecks {
  private static readonly map = new Map<SessionNumber, SessionDeckNumbers>([
    [0, [0, 2, 5, 9]],
    [1, [1, 3, 6, 0]],
  ]);

  static get(sessionNumber: SessionNumber): SessionDeckNumbers {
    const sessionDeckNumbers = SessionDecks.map.get(sessionNumber);

    if (sessionDeckNumbers === undefined) {
      throw new Error(
        `Session deck for session ${sessionNumber} does not exist`
      );
    }

    return sessionDeckNumbers;
  }
}
