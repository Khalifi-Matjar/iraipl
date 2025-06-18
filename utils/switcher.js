const rowGrouping = (
    { data: tableData, relation, key, reference, level = 0 },
    depth
) => {
    const grouping = tableData
        ?.filter((data) => data[relation] === reference)
        ?.map((data) => {
            const { grouping } = rowGrouping(
                {
                    data: tableData,
                    relation,
                    key,
                    reference: data[key],
                    level: level + 1,
                },
                depth
            );

            return { ...data, _level: level, children: grouping };
        });

    depth.current = level > depth.current ? level : depth.current;

    return {
        grouping,
    };
};

module.exports = {
    rowGrouping,
};
