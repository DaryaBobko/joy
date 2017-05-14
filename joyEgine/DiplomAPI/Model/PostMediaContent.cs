//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Model
{
    using System.Linq.Expressions;
    using Joy.Data.Common;
    using System;
    using System.Collections.Generic;
    
    public partial class PostMediaContent: IEntity	{
    	    public int Id { get; set; }
        public int PostId { get; set; }
        public int MediaContentId { get; set; }
    
        public virtual MediaContent MediaContent { get; set; }
        public virtual Post Post { get; set; }
    
    	public static Expression<Func<PostMediaContent, int>> PrimaryKeySelector
    	{
    		get { return x => x.Id; }
    	}
    
    	public int PrimaryKey
    	{
    	    get { return Id; }
    		set { Id = value; } 
    	}
    
    }
}
