CREATE TABLE [dbo].[UserToRole] (
    [UserId] INT NOT NULL,
    [RoleId] INT NOT NULL,
    CONSTRAINT [FK_UserToRole_UserRoles] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[UserRoles] ([Id]),
    CONSTRAINT [FK_UserToRole_Users] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id])
   
);

