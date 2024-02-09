/**
 * Extracts unique values from a specified property or nested property in an array of recipes.
 *
 * @param {Array} recipes - The array of recipes.
 * @param {string} nameDataExtract - The name of the property to extract from each recipe.
 * @param {string} [secondNameDataExtract] - The optional name of a nested property to extract from each item in the first property.
 * @returns {Array} - An array of unique values extracted from the specified property or nested property.
 */
export default function OptionsExtract(recipes, nameDataExtract, secondNameDataExtract = undefined) {
  // Map through the recipes array to extract the specified property.
  const newArray = recipes.map(recipe => {
    // Extract the first property based on the provided nameDataExtract.
    let firstProperty = recipe[nameDataExtract];

    // Check if a second property is specified for nested extraction.
    if (secondNameDataExtract) {
      // If specified, map through the first property to extract the second property.
      return firstProperty.map(item => {
        return item[secondNameDataExtract];
      });
    }
    // If no second property is specified, return the extracted first property directly.
    return firstProperty;
  });

  // Flatten the array of extracted properties.
  const flatNewArray = newArray.flat();

  // Use a set to ensure unique values and return the result.
  return [...new Set(flatNewArray)];
}
