import axios from 'axios';

export const fetchbooks = async(req,res) => {

    try{

        //console.log('API Key:', process.env.GOOGLE_BOOKS_API_KEY ? 'Present' : 'Missing');

        const response = await axios.get("https://www.googleapis.com/books/v1/volumes?", {
            params: {
                q: req.query.q || 'bestsellers',
                key: process.env.GOOGLE_BOOKS_API_KEY,
                maxResults: 10,  
            }
        });

        res.json(response.data.items || []);

    }catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }

}

export const popularBooks = async(req,res) => {

    try{

        const listName = "hardcover-fiction"; 
        const date = new Date().toISOString().split("T")[0];
        const nytUrl = `https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json`;

        const response = await axios.get(nytUrl, {
            params: {
                "api-key": process.env.NYC_BOOKS_API,
            },
        });

        const books = response.data.results.books;

        const googleBookPromises = books.map(book => 
            axios.get('https://www.googleapis.com/books/v1/volumes',{
                params:{
                    q: book.title,
                    key: process.env.GOOGLE_BOOKS_API_KEY,
                    maxResults:1,
                }
            })
        )

        const allBooks = await Promise.all(googleBookPromises);

        const mergedBooks = allBooks.map((item, idx) => {
            return item.data.items[0];
        });

        res.json(mergedBooks);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: err.message });
    }
}
