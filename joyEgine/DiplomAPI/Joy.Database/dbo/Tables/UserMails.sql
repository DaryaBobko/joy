CREATE TABLE [dbo].[UserMails]
(
	[Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [FromId] INT NOT NULL, 
    [ToId] INT NOT NULL, 
    [Text] NVARCHAR(MAX) NOT NULL,
	 CONSTRAINT [FK_UserMail_FromUser] FOREIGN KEY ([FromId]) REFERENCES [dbo].[Users] ([Id]),
	 CONSTRAINT [FK_UserMail_ToUser] FOREIGN KEY ([ToId]) REFERENCES [dbo].[Users] ([Id])
)
