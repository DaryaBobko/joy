CREATE TABLE [dbo].[Posts] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Tittle]      NVARCHAR (100) NOT NULL,
    [ContentText] NVARCHAR (MAX) NULL,
    [CreatedOn]   DATETIME2 (7)  NOT NULL DEFAULT GetDate(),
    [CreatedBy]   INT            NOT NULL DEFAULT 1,
    [Status] INT NOT NULL DEFAULT 2, 
    CONSTRAINT [PK_posts] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Posts_Users] FOREIGN KEY ([CreatedBy]) REFERENCES [dbo].[Users] ([Id])
);

