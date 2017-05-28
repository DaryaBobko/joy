CREATE TABLE [dbo].[Tags] (
    [Id]   INT           IDENTITY (1, 1) NOT NULL,
    [Name] NVARCHAR (50) NOT NULL,
    [Status] INT NOT NULL DEFAULT 2, 
    CONSTRAINT [PK_tags] PRIMARY KEY CLUSTERED ([Id] ASC)
);

