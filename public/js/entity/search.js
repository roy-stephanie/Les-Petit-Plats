import Render from '../render/Render.js';
import { inputSecure } from '../lib/inputSecure.js';

/**
 * Search function that manages the state of search and tags.
 *
 * @param {string} initialSearch - The initial search string (optional, defaults to undefined).
 * @param {Array} initialTags - The initial array of tags (optional, defaults to an empty array).
 * @returns {Object} - An object with methods to manage search and tags.
 */
export default function Search(initialSearch = undefined, initialTags = []) {
  /**
   * State object to store search and tags.
   *
   * @type {Object}
   * @property {string} search - The current search string.
   * @property {Array} tags - The current array of tags.
   */
  const state = {
    search: initialSearch,
    tags: initialTags,
  };

  /**
   * Function to update the state and trigger rendering.
   *
   * @param {string} prop - The property to update in the state.
   * @param {string|Array} value - The new value for the property.
   */
  const updateState = (prop, value) => {
    state[prop] = value;
    Render({ setSearch, setTags, removeTag, getSearch, getTags });
  };

  /**
   * Method to set the search value in the state.
   *
   * @param {string} value - The new search value.
   */
  const setSearch = (value) => updateState('search', inputSecure(value));

  /**
   * Method to set tags in the state.
   *
   * @param {string|Array} value - The tag or array of tags to add.
   */
  const setTags = (value) => {
    if (typeof value === 'string') {
      // Check if the value already exists in the tags array
      if (!state.tags.includes(value)) {
        const updatedTags = state.tags ? [...state.tags, value] : [value];
        updateState('tags', updatedTags ? updatedTags : '');
      }
    } else if (Array.isArray(value)) {
      // To add multiple tags
      const newTags = value.filter(tag => typeof tag === 'string' && !state.tags.includes(tag));
      const updatedTags = [...state.tags, ...newTags];
      updateState('tags', updatedTags);
    }
  };

  /**
   * Method to remove a tag from the state.
   *
   * @param {string} tagToRemove - The tag to remove.
   */
  const removeTag = (tagToRemove) => {
    const updatedTags = state.tags.filter(tag => tag !== tagToRemove);
    if (updatedTags) updateState('tags', updatedTags);
  };

  /**
   * Getter method for the search value.
   *
   * @returns {string} - The current search value.
   */
  const getSearch = () => state.search;

  /**
   * Getter method for the tags array.
   *
   * @returns {Array} - The current array of tags.
   */
  const getTags = () => state.tags;

  // Initial rendering
  if (!initialSearch) Render({ setSearch, setTags, removeTag, getSearch, getTags });

  // Return an object with methods to manage search and tags
  return { setSearch, setTags, removeTag, getSearch, getTags };
}
