CREATE TABLE [dbo].[MediaContent] (
    [Id]     INT            IDENTITY (1, 1) NOT NULL,
    [Path]   NVARCHAR (MAX) NOT NULL,
    [Name]   NCHAR (50)     NOT NULL,
    [TypeId] INT            NOT NULL,
    CONSTRAINT [PK_mediaContent] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_mediaContent_MdiaContentTypes] FOREIGN KEY ([TypeId]) REFERENCES [dbo].[MdiaContentTypes] ([Id])
);

