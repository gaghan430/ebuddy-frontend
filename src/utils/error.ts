export const normalizeHttpError = (data: any) => {
    if (data?.errors) {
        return data?.errors.map((row: any) => row.message).join(', ')
    }

    return "Something bad happened!"
}