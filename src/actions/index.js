// import {
//   ADD_ARTICLE,
//   DATA_REQUESTED,
//   PERFORM_LOGIN,
//   LOGIN_SUCCESSFUL,
// } from '../constants/action-types';
import {dataAvailable, updatePostCount} from '../reducers/dataReducer';
const Realm = require('realm');
import {PostsSchema, POSTS_SCHEMA} from '../model/postsSchema';
import axios from 'axios';

const databaseOptions = {
  path: 'realmT4.realm',
  schema: [PostsSchema],
  schemaVersion: 1,
};

export const fetchAndStoreToDatabase = () => {
  return (dispatch) => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      console.log('response ayo' + JSON.stringify(response.data));
      Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
          response.data.forEach((obj) => {
            realm.create(POSTS_SCHEMA, obj);
          });
          console.log('size' + realm.objects(POSTS_SCHEMA).length);
          dispatch(updatePostCount(realm.objects(POSTS_SCHEMA).length));
        });
      });
    });
  };
};

export const getDataFromDatabase = () => {
  return (dispatch) => {
    Realm.open(databaseOptions).then((realm) => {
      const res = realm.objects(POSTS_SCHEMA);
      dispatch(dataAvailable(res));
      dispatch(updatePostCount(realm.objects(POSTS_SCHEMA).length));
    });
  };
};

export const clearPostsFromDatabase = () => {
  return (dispatch) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          const allPosts = realm.objects(POSTS_SCHEMA);
          realm.delete(allPosts);
          dispatch(dataAvailable([]));
          dispatch(updatePostCount(realm.objects(POSTS_SCHEMA).length));
        });
      })
      .catch((error) => {});
  };
};
