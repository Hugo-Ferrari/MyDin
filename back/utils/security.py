from datetime import datetime, timedelta
import os

MAX_FAILED = int(os.getenv("MAX_FAILED_ATTEMPTS", 5))
LOCKOUT_MIN = int(os.getenv("LOCKOUT_MINUTES", 15))
WINDOW_MIN = int(os.getenv("FAILED_WINDOW_MINUTES", 15))

def is_account_locked(user_id: str, attempts: list[dict]) -> tuple[bool, int]:
    now = datetime.utcnow()
    window_start = now - timedelta(minutes=WINDOW_MIN)
    recent_failed = [a for a in attempts if (not a.get("success")) and a["timestamp"] >= window_start]
    if len(recent_failed) >= MAX_FAILED:
        last = max(a["timestamp"] for a in recent_failed)
        unlock_at = last + timedelta(minutes=LOCKOUT_MIN)
        minutes_left = int((unlock_at - now).total_seconds() // 60) + 1
        return True, max(minutes_left, 0)
    return False, 0
