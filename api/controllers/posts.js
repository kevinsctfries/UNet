const getPosts = async (req, res) => {
  const q = `
    SELECT p.*, u.id as userId, u.name, u.profilePic, 
           un.name as unionName, un.slug as unionSlug
    FROM posts p 
    JOIN users u ON u.id = p.userId
    LEFT JOIN unions un ON un.id = p.unionId
  `;

  try {
    db.query(q, [], (err, data) => {
      if (err) return res.status(500).json(err);

      const posts = data.map(post => ({
        ...post,
        union: post.unionName
          ? {
              name: post.unionName,
              slug: post.unionSlug,
            }
          : undefined,
      }));

      return res.status(200).json(posts);
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json(error);
  }
};
