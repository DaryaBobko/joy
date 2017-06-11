CREATE TABLE [dbo].[PostRating]
(
	[Id] INT NOT NULL IDENTITY PRIMARY KEY, 
    [PostId] INT NOT NULL, 
    [UserId] INT NOT NULL, 
    [IsLike] BIT NOT NULL,	
	CONSTRAINT [FK_Rating_Post] FOREIGN KEY ([PostId]) REFERENCES [dbo].[Posts] ([Id]),
	CONSTRAINT [FK_Rating_User] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users] ([Id])

)
