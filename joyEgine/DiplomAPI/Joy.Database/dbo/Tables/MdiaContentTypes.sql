CREATE TABLE [dbo].[MdiaContentTypes] (
    [Id]   INT           IDENTITY (1, 1) NOT NULL,
    [Name] NVARCHAR (25) NOT NULL,
    CONSTRAINT [PK_MdiaContentTypes] PRIMARY KEY CLUSTERED ([Id] ASC)
);

