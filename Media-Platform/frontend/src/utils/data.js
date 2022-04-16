export const userQuery = (userId) => { 
    const query = `*[_type == "user" && _id == '${userId}']`;
    return query;
};

//Sanity uses GROQ (query language), refer sanity.io/how-queries-work
export const searchQuery = (searchTerm) => { 
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*'] {
        image {
            asset -> { url }
        }, 
        _id,
        destination,
        postedBy -> {
            _id, userName, image
        }, 
        save[] {
            _keys, 
            postedBy -> {
                _id, userName, image
            },
        },
    }`;
    return query;
};

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc) {
    image {
        asset -> { url }
    }, 
    _id,
    destination,
    postedBy -> {
        _id, userName, image
    }, 
    save[] {
        _keys, 
        postedBy -> {
            _id, userName, image
        },
    },
}`;

export const categories = [
    {
      name: 'Industrial',
      image: 'https://cdn1.vectorstock.com/i/thumb-large/12/80/industrial-factory-waste-symbol-vector-30011280.jpg',
    },
    {
      name: 'Household - Recyclable',
      image: 'https://d2n4wb9orp1vta.cloudfront.net/cms/brand/pt/2021-pt/pt0921-blog-recyclearrows.jpg;maxWidth=720',
    },
    {
      name: 'Household - Non-Recyclable',
      image: 'https://rnrf.org/wp-content/uploads/2021/09/recycling-symbol-300x300.png',
    },
    {
      name: 'Hospital and Labs',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Biohazard_symbol.svg/1200px-Biohazard_symbol.svg.png',
    },
    {
      name: 'Others',
      image: 'https://e7.pngegg.com/pngimages/106/806/png-clipart-garbage-signage-tidy-man-logo-waste-container-symbol-cleanliness-s-text-recycling.png',
    },
];


export const pinDetailQuery = (pinId) => {
    const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`;
    return query;
};
  
export const pinDetailMorePinQuery = (pin) => {
    const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
};

export const userCreatedPinsQuery = (userId) => {
    const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
};
  
export const userSavedPinsQuery = (userId) => {
    const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
};