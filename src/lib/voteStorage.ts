import localforage from "localforage"

const voteStore = localforage.createInstance({
    name: "dorsalVotes",
})

export const getVote = async (featureId: string): Promise<{
    count: number
    voted: "upvote" | "downvote" | null
} | null> => {
    try {
        const data = await voteStore.getItem(featureId)
        return data as any
    } catch (e) {
        console.error("Error reading from localforage:", e)
        return null
    }
}

export const setVote = async (
    featureId: string,
    vote: { count: number; voted: "upvote" | "downvote" | null }
) => {
    try {
        await voteStore.setItem(featureId, vote)
    } catch (e) {
        console.error("Error writing to localforage:", e)
    }
}
