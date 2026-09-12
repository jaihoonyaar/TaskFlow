export function extractTaskList(response) {
    if (Array.isArray(response)) {
        return response;
    }

    if (Array.isArray(response?.tasks)) {
        return response.tasks;
    }

    if (Array.isArray(response?.data)) {
        return response.data;
    }

    if (Array.isArray(response?.data?.tasks)) {
        return response.data.tasks;
    }

    return [];
}

export function extractTask(response) {
    if (!response) {
        return null;
    }

    // Direct task
    if (response._id) {
        return response;
    }

    // { task: {...} }
    if (response.task?._id) {
        return response.task;
    }

    // { data: {...} }
    if (response.data?._id) {
        return response.data;
    }

    // { data: { task: {...} } }
    if (response.data?.task?._id) {
        return response.data.task;
    }

    return null;
}