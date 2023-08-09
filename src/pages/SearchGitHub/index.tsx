import { useEffect } from 'react';
import SearchService from "../../services/SearchService.ts";
import classNames from 'classnames/bind';
import styles from './SearchGithub.module.scss';

const cx = classNames.bind(styles);

function SearchGitHub() {
    useEffect(() => {
        SearchService.findUserInGithub("tuanpc").then(rs => {
            console.log("re-render")
            console.log(rs)
        })
    }, []);
    return <>
        <h3 className={cx('search')}>Search Github</h3>
        <h3 className={cx('search')}>Search Github</h3>
    </>;
}
export default SearchGitHub;
