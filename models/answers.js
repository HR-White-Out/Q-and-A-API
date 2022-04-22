module.exports = function Answers(sequelize, DataTypes) {
  return sequelize.define('answers', {
    answer_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'question_id',
      },
    },
    body: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: new Date().getTime(),
    },
    answerer_name: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: 'Anonymous',
    },
    answerer_email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: '',
    },
    helpfulness: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    reported: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  }, {
    sequelize,
    tableName: 'answers',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'answers_pkey',
        unique: true,
        fields: [
          { name: 'answer_id' },
        ],
      },
      {
        name: 'question_id_idx',
        fields: [
          { name: 'question_id' },
        ],
      },
    ],
  });
};
