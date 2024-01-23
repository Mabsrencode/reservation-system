import { useEffect } from 'react';

const usePageMetadata = (title, description) => {
    useEffect(() => {
        document.title = title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = description || '';
        }
    }, [title, description]);
};

export default usePageMetadata;
