import { useEffect, useState } from "react";
import { HOST } from "src/config";
import axios from "axios";

function usePostsLoad(pageNumber) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        let cancel;
        setLoading(true);
        setError(false);
        axios({
            method: "GET",
            url: `${HOST}/api/posts`,
            params: {
                page: pageNumber,
                limit: 12,
                orderBy: "id",
                order: "desc",
                q: "",
                token: localStorage.getItem("token")
            },
            cancelToken: new axios.CancelToken((c) => cancel = c)
        })
            .then((res) => {
                setPosts((posts) => {
                    return [...posts, ...res.data.data];
                });
                setHasMore(res.data.lastPage > res.data.page);
            })
            .catch((e) => {
                if (axios.isCancel(e)) return;
                setError(true);
            })
            .finally(() => {
                setLoading(false);
            });
        return () => cancel();
    }, [pageNumber]);
    return { loading, error, posts, hasMore };
}

export default usePostsLoad;
