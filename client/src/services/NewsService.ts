export type News = {
    id: number;
    title: string;
    content: string;
    views: number;
};

const mockNews : News[] = [
    { id: 1, title: "Prva vest", content: "Sadrzaj prve vesti.", views: 123 },
    { id: 2, title: "Druga vest", content: "Sadrzaj druge vesti.", views: 98 },
    { id: 3, title: "Treca vest", content: "Sadrzaj trece vesti", views: 83 },
];

export function getAllNews(): News[] {
    return mockNews;
};