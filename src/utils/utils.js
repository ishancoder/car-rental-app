export function paginate(array, pageNumber, pageSize) {
    const startIndex = pageNumber * pageSize;
    const endIndex = startIndex + pageSize;
    return array.slice(startIndex, endIndex);
}