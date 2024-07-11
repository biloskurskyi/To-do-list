import React, {useState, useEffect} from 'react';
import axiosInstance from '../API/api.tsx';

interface PostData {
    id: number;
    title: string;
    content: string;
}

interface useFetchPostHook {
    post: PostData | null;
    loading: boolean;
    error: string | null;
}

const useFetchPost = (id): useFetchPostHook => {
    const [post, setPost] = useState<PostData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect((): void => {
        const fetchPost = async () => {
            try {
                const response = await axiosInstance.get<PostData>(`/post/${id}`);
                setPost(response.data);
            } catch (error) {
                setError('Post not found');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    return {post, loading, error};
};

export default useFetchPost;
