import { useState, useEffect } from 'react';
import axiosInstance from '../API/api.tsx';

const useFetchPost = (id) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axiosInstance.get(`/post/${id}`);
                setPost(response.data);
            } catch (error) {
                setError('Post not found');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    return { post, loading, error };
};

export default useFetchPost;
