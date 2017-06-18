CREATE TABLE [dbo].[Users] (
    [Id]       INT            IDENTITY (1, 1) NOT NULL,
    [UserName] NVARCHAR (50)     NOT NULL,
    [Password] NVARCHAR (256) NOT NULL,
    [Email]    NVARCHAR (50)     NOT NULL,
    [AvatarId] INT NULL, 
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC),
	CONSTRAINT [FK_User_Image] FOREIGN KEY ([AvatarId]) REFERENCES [dbo].[MediaContent] ([Id])
);

