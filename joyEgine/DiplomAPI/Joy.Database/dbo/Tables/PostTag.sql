CREATE TABLE [dbo].[PostTag] (
    [PostId] INT NOT NULL,
    [TagId]  INT NOT NULL,
    CONSTRAINT [FK_PostTag_posts] FOREIGN KEY ([PostId]) REFERENCES [dbo].[Posts] ([Id]),
    CONSTRAINT [FK_PostTag_tags] FOREIGN KEY ([TagId]) REFERENCES [dbo].[Tags] ([Id])
);

