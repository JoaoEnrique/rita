import { User } from "@/types";

export const isAdmin = (user: User): boolean => {
    return user && user.id <=5
}