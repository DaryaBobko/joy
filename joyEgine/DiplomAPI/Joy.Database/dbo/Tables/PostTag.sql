CREATE TABLE [dbo].[PostTag] (
    [Id]     INT IDENTITY (1, 1) NOT NULL,
    [PostId] INT NOT NULL,
    [TagId]  INT NOT NULL,
    CONSTRAINT [PK_PostTag] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PostTag_posts] FOREIGN KEY ([PostId]) REFERENCES [dbo].[Posts] ([Id]),
    CONSTRAINT [FK_PostTag_tags] FOREIGN KEY ([TagId]) REFERENCES [dbo].[Tags] ([Id])
);

