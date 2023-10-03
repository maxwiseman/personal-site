export interface BlogPost {
  _createdAt: Date;
  _updatedAt: Date;
  _id: string;
  _rev: string;
  _type: "project";
  name: string;
  slug: { current: string; _type: "slug" };
  description: string;
  cover: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  body: Block[];
}

interface Block {
  _type: "block";
  children: {
    _type: string;
    marks?: [];
    text?: string;
    _key?: string;
    markDefs?: [];
  }[];
  markDefs: [];
  style: "normal";
}
