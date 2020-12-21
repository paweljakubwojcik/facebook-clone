
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';


const useResizeObserver = ({ callback, element }) => {

    const current = element && element.current;

    const observer = useRef(null);

    useEffect(() => {
        // if we are already observing old element
        if (observer && observer.current && current) {
            observer.current.unobserve(current);
        }

        observer.current = new ResizeObserver(() => callback(element.current));

        observe()

        return () => {
            if (observer && observer.current && element &&
                current) {
                observer.current.unobserve(current);
            }
        };
    }, [current]);

    const observe = () => {
        if (element && element.current && observer.current) {
            observer.current.observe(element.current);

        }
    };

};

useResizeObserver.propTypes = {
    element: PropTypes.object,
    callback: PropTypes.func,
};

export default useResizeObserver;