'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useUser } from '@/context/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function ProfileSelectionModal() {
  const { users, currentUser, setCurrentUser } = useUser();

  const handleSelectUser = (userId: string) => {
    setCurrentUser(userId);
  };

  return (
    <Dialog open={!currentUser}>
      <DialogContent className="sm:max-w-md" hideCloseButton={true}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline text-center">Who's Watching?</DialogTitle>
          <DialogDescription className="text-center">
            Choose your profile to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center gap-4 py-4">
          {users.map(user => (
            <div
              key={user.id}
              onClick={() => handleSelectUser(user.id)}
              className="flex flex-col items-center gap-2 cursor-pointer group"
            >
              <Avatar className="h-20 w-20 ring-2 ring-transparent group-hover:ring-primary transition-all">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-muted-foreground group-hover:text-primary transition-colors">
                {user.name}
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
