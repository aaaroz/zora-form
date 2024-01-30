"use client";

import { signOut } from "next-auth/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

export const ButtonLogout = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-sm">
          Log out
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Are You Sure?</DialogTitle>
        <DialogHeader>You will be logged out of your account.</DialogHeader>
        <DialogDescription>
          since you logged out of your account you will need to log in again.
        </DialogDescription>
        <DialogFooter>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Log out
          </Button>
          <DialogClose asChild>
            <Button variant="ghost" size="sm">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
