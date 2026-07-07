import { useEffect, useRef, useState } from 'react';

import { DEBUG_DISABLE_TIMER, TURN_TIME_LIMIT } from '../config';

export interface UseTurnTimerOptions {
  /** true only while the player is allowed to submit a word */
  isPlayerTurn: boolean;
  /** change this value when a new player turn starts to reset from TURN_TIME_LIMIT */
  turnKey: string | number;
  /** return true to consume/prevent this timeout, e.g. T7 skill "ひらめき" */
  onBeforeTimeout?: () => boolean;
  /** called exactly once when the timer reaches 0 and is not prevented */
  onTimeout: () => void;
}

export interface UseTurnTimerResult {
  remainingSeconds: number;
  isTimerDisabled: boolean;
}

export function useTurnTimer({
  isPlayerTurn,
  turnKey,
  onBeforeTimeout,
  onTimeout,
}: UseTurnTimerOptions): UseTurnTimerResult {
  const [remainingSeconds, setRemainingSeconds] = useState(TURN_TIME_LIMIT);
  const onBeforeTimeoutRef = useRef(onBeforeTimeout);
  const onTimeoutRef = useRef(onTimeout);

  useEffect(() => {
    onBeforeTimeoutRef.current = onBeforeTimeout;
  }, [onBeforeTimeout]);

  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  useEffect(() => {
    setRemainingSeconds(TURN_TIME_LIMIT);

    if (DEBUG_DISABLE_TIMER || !isPlayerTurn) {
      return;
    }

    let timeoutHandled = false;
    const intervalId = window.setInterval(() => {
      setRemainingSeconds((current) => {
        const next = Math.max(0, current - 1);

        if (next === 0 && !timeoutHandled) {
          if (onBeforeTimeoutRef.current?.()) {
            return TURN_TIME_LIMIT;
          }

          timeoutHandled = true;
          window.clearInterval(intervalId);
          onTimeoutRef.current();
        }

        return next;
      });
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isPlayerTurn, turnKey]);

  return {
    remainingSeconds,
    isTimerDisabled: DEBUG_DISABLE_TIMER,
  };
}
