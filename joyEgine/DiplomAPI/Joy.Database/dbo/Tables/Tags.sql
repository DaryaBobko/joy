CREATE TABLE [dbo].[Tags] (
    [Id]   INT           IDENTITY (1, 1) NOT NULL,
    [Name] NVARCHAR (50) NOT NULL,
    CONSTRAINT [PK_tags] PRIMARY KEY CLUSTERED ([Id] ASC)
);

