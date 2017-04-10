CREATE TABLE [dbo].[Users] (
    [Id]       INT            IDENTITY (1, 1) NOT NULL,
    [UserName] NCHAR (50)     NOT NULL,
    [Password] NVARCHAR (256) NOT NULL,
    [Email]    NCHAR (50)     NOT NULL,
    CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED ([Id] ASC)
);

