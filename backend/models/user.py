from pydantic import BaseModel, EmailStr, validator

class UserCreate(BaseModel):
    email: EmailStr
    password: str

    @validator("password")
    def password_byte_length(cls, v):
        byte_length = len(v.encode("utf-8"))
        if byte_length > 72:
            raise ValueError(f"Password too long ({byte_length} bytes). Max 72 bytes allowed.")
        return v
