// Capitalize the first letter of the word
export const capitalizeFirstLetter = (word) => {
    if (word) 
        return word.charAt(0).toUpperCase() + word.slice(1);
    return '';
};

// To not show html tags of the content of summerNote field in the page of details  
export const removeHTMLTags = (props) => {
    return {__html: props}
};
