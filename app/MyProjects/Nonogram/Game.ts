import { useSearchParams } from 'react-router';

const Game = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = setID();

    function setID() {
        let id = searchParams.get("id");

        if (!id) {
            id = Date.now().toString();
            setSearchParams({ id: id.toString() });
        }

        return id;
    }
}