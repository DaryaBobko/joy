CREATE TABLE [dbo].[PostMediaContent] (
    [Id]             INT IDENTITY (1, 1) NOT NULL,
    [PostId]         INT NOT NULL,
    [MediaContentId] INT NOT NULL,
    CONSTRAINT [PK_PostMediaContent] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PostMediaContent_mediaContent] FOREIGN KEY ([MediaContentId]) REFERENCES [dbo].[MediaContent] ([Id]),
    CONSTRAINT [FK_PostMediaContent_posts] FOREIGN KEY ([PostId]) REFERENCES [dbo].[Posts] ([Id])
);

