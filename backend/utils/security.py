from passlib.context import CryptContext

# Ensure you have: pip install bcrypt==4.0.1 passlib[bcrypt]
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    # bcrypt limitation: max 72 bytes
    safe_password = password.encode("utf-8")[:72].decode("utf-8", errors="ignore")
    return pwd_context.hash(safe_password)

def verify_password(password: str, hashed: str) -> bool:
    safe_password = password.encode("utf-8")[:72].decode("utf-8", errors="ignore")
    return pwd_context.verify(safe_password, hashed)
