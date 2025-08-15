export type Class = {
    code: string;
    name: string;
    day: string;
    hours: string;
    classroom: string | null;
    teacher_id: string | null;
    teacher_name: string | null;
    group: string;
};

export type ProcessedClass = {
    code: string;
    day: string;
    start: string; // "HH:MM"
    end: string;   // "HH:MM"
    name: string;
    classroom: string | null;
    teacher_id: string | null;
    teacher_name: string | null;
    group: string;
};

export function processSchedule(data: Class[]): ProcessedClass[] {
    return data.map(_class => {
        const [start, end] = _class.hours.split("-");
        return {
            code: _class.code,
            day: _class.day,
            start,
            end,
            name: _class.name,
            classroom: _class.classroom,
            group: _class.group,
            teacher_id: _class.teacher_id,
            teacher_name: _class.teacher_name
        };
    });
}