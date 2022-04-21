module.exports = function QuestionsModel(sequelize, DataTypes) {
  return sequelize.define('questions', {
    question_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    question_body: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    question_date: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: new Date().getTime(),
    },
    asker_name: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: 'Anonymous',
    },
    asker_email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: 'NULL',
    },
    question_helpfulness: {
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
    tableName: 'questions',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: 'questions_pkey',
        unique: true,
        fields: [
          { name: 'question_id' },
        ],
      },
    ],
  });
};
